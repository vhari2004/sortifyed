def calculate_match(job_skills, user_skills):

    matched = len(
        set(job_skills).intersection(
            set(user_skills)
        )
    )

    if len(job_skills) == 0:
        return 0

    return int(
        (matched / len(job_skills)) * 100
    )