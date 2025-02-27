from django.test import TestCase
from .models import Tag

class TagModelTest(TestCase):

    def setUp(self):
        self.tag = Tag.objects.create(nombre='ejemplo', idCategoria=1)

    def test_tag_creation(self):
        self.assertEqual(self.tag.nombre, 'ejemplo')
        self.assertEqual(self.tag.idCategoria, 1)
    
    def test_tag_string_representation(self):
        self.assertEqual(str(self.tag), 'ejemplo')

# Create your tests here.
