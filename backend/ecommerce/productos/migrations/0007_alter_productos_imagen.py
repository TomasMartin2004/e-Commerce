# Generated by Django 5.0.7 on 2024-09-30 01:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0006_rename_imagen_url_productos_imagen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productos',
            name='imagen',
            field=models.ImageField(blank=True, null=True, upload_to='productos/'),
        ),
    ]
