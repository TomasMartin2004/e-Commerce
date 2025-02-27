# Generated by Django 5.0.6 on 2024-12-05 23:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('custom_auth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='apellido',
            field=models.CharField(default='apellido', max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='dni',
            field=models.IntegerField(default='12121212'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='nombre',
            field=models.CharField(default='nombre', max_length=30),
            preserve_default=False,
        ),
    ]
