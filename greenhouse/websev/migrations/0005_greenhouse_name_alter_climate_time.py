# Generated by Django 4.2.13 on 2024-05-09 16:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('websev', '0004_alter_climate_date_alter_climate_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='greenhouse',
            name='name',
            field=models.CharField(default='Оранжерея', max_length=50),
        ),
        migrations.AlterField(
            model_name='climate',
            name='time',
            field=models.TimeField(default=datetime.time(19, 39, 55, 271420)),
        ),
    ]