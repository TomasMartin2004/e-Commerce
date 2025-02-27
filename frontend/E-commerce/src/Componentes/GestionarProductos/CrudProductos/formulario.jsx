import React from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';
import { useFetch } from '../../../Request/fetch';

export default function Formulario({editedProduct, setEditedProduct, handleInputChange}) {
  const { data: tags, loading: loadingTags } = useFetch('/tags/');

  return (
    <>
    <TextField
    label="Nombre"
    value={editedProduct?.nombre || ''}
    onChange={(e) => handleInputChange('nombre', e.target.value)}
    fullWidth
    sx={{
      backgroundColor: 'white',
    }}
    />

  <Box sx={{ maxWidth: '300px', overflow: 'hidden' }}>
    <Autocomplete
      multiple
      options={tags || []}
      getOptionLabel={(option) => option.nombre}
      value={tags?.filter((tag) => editedProduct?.tags?.includes(tag.id)) || []}
      onChange={(_, value) => handleInputChange('tags', value.map((tag) => tag.id))}
      loading={loadingTags}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          sx={{
            backgroundColor: 'white',
          }}
        />
      )}
    />
  </Box>


  <TextField
    label="Precio"
    type="number"
    value={editedProduct?.precio ?? ''}
    onChange={(e) => handleInputChange('precio', e.target.value)}
    fullWidth
    sx={{
      backgroundColor: 'white',
    }}
    />
  <TextField
    label="Stock"
    type="number"
    value={editedProduct?.stock || ''}
    onChange={(e) => handleInputChange('stock', e.target.value)}
    fullWidth
    sx={{
      backgroundColor: 'white',
    }}
  />
  <TextField
    label="Descripción"
    multiline
    rows={4}
    value={editedProduct?.descripcion || ''}
    onChange={(e) => handleInputChange('descripcion', e.target.value)}
    fullWidth
    sx={{
      backgroundColor: 'white',
    }}
    />
    </>
  )
}

