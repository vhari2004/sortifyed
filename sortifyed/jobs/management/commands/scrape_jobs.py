from django.core.management.base import BaseCommand
from scrapers.registry import run_all_scrapers


class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        run_all_scrapers()

        self.stdout.write(
            self.style.SUCCESS(
                "Scraping completed"
            )
        )