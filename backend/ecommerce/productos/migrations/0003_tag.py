# Generated by Django 5.0.7 on 2024-09-24 20:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0002_categorias'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('idCategoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='productos.categorias')),
            ],
        ),
    ]
