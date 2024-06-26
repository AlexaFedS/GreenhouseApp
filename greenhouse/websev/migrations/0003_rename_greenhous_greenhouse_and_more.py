# Generated by Django 4.2.13 on 2024-05-08 22:05

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('websev', '0002_remove_sensor_value_climate_value'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='GreenHous',
            new_name='GreenHouse',
        ),
        migrations.RenameField(
            model_name='sensor',
            old_name='idGreenHous',
            new_name='idGreenHouse',
        ),
        migrations.AlterField(
            model_name='standart',
            name='value',
            field=models.IntegerField(default=0),
        ),
    ]
