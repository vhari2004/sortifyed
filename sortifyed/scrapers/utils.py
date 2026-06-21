from jobs.models import Job


def save_job(job_data):
    Job.objects.get_or_create(
        job_url=job_data["job_url"],
        defaults=job_data
    )