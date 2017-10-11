import os
import csv
from django.core import management
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
import psycopg2 as db
from _utils import refresh_csv


class Command(BaseCommand):
    help = 'drops and recreates the app database.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--handrail',
            action='store_true',
            dest='handrail',
            default=False,
            help='update handrail data from stairquest',
        )
        
        parser.add_argument(
            '--step_count',
            action='store_true',
            dest='step_count',
            default=False,
            help='update step count data from stairquest',
        )
        
        pass

    def handle(self, *args, **options):

        refresh_csv(table_name="wp_gq_stair_vote")
        if options['handrail']:
            self.update_handrail_info()
        if options['step_count']:
            self.update_step_count_info()
        
    def update_handrail_info(self):
        print("updating handrail information")
        return
        
    def update_step_count_info(self):
        print("updating step count information")
        return
