import requests
from bs4 import BeautifulSoup

from jobs.models import UserProfile
from jobs.services.matcher import calculate_match
from scrapers.utils import save_job


def get_jobs():
    url = "https://wellfound.com/jobs"

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(
        url,
        headers=headers
    )

    print("Status:", response.status_code)

    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )

    print("Title:", soup.title)

    # Temporary sample jobs until real parsing is added
    jobs = [
        {
            "title": "Junior Python Developer",
            "company": "Tech Corp",
            "location": "Remote",
            "experience": "0-2 Years",
            "salary": "3-5 LPA",
            "skills": ["Python", "Django", "Docker"],
            "source": "Wellfound",
            "job_url": "https://example.com/job1",
            "description": "Python Django Developer"
        }
    ]

    profile = UserProfile.objects.first()

    if not profile:
        print("No UserProfile found")
        return

    for job in jobs:

        job["match_score"] = calculate_match(
            job["skills"],
            profile.skills
        )

        save_job(job)

        print(
            f"Saved: {job['title']} "
            f"(Match: {job['match_score']}%)"
        )