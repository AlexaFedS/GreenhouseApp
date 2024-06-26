# Generated by Django 5.0.6 on 2024-05-14 15:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('websev', '0008_remove_plant_idgreenhouse_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='climate',
            name='date',
            field=models.CharField(default='14.05.2024', max_length=10),
        ),
        migrations.AlterField(
            model_name='climate',
            name='time',
            field=models.TimeField(default=datetime.time(18, 47, 34, 429475)),
        ),
        migrations.AlterField(
            model_name='climate',
            name='value',
            field=models.FloatField(default=0),
        ),
    ]
