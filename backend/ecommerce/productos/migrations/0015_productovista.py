# Generated by Django 5.0.6 on 2025-02-16 23:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0014_delete_productovista'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductoVista',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=50)),
                ('visto_en', models.DateTimeField(auto_now_add=True)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='productos.productos')),
            ],
            options={
                'unique_together': {('user_id', 'producto')},
            },
        ),
    ]
