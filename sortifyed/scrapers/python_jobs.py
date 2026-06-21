import requests
from bs4 import BeautifulSoup

from jobs.models import UserProfile
from jobs.services.matcher import calculate_match
from scrapers.utils import save_job


def get_python_jobs():

    url = "https://www.python.org/jobs/"

    response = requests.get(
        url,
        headers={
            "User-Agent": "Mozilla/5.0"
        }
    )

    print("Status:", response.status_code)

    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )

    jobs = soup.select(".list-recent-jobs li")

    print(f"Found {len(jobs)} jobs")

    profile = UserProfile.objects.first()

    for item in jobs:

        title_tag = item.select_one("h2 a")

        if not title_tag:
            continue

        title = title_tag.get_text(strip=True)

        job_url = (
            "https://www.python.org"
            + title_tag.get("href")
        )
        print(job_url)
        job_data = {
            "title": title,
            "company": "Unknown",
            "location": "Unknown",
            "experience": "",
            "salary": "",
            "skills": ["Python"],
            "source": "Python.org",
            "job_url": job_url,
            "description": title
        }

        if profile:
            job_data["match_score"] = calculate_match(
                job_data["skills"],
                profile.skills
            )

        save_job(job_data)

        print("Saved:", title)