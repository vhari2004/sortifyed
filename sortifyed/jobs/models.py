from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    experience = models.CharField(max_length=100, blank=True)
    salary = models.CharField(max_length=100, blank=True)
    skills = models.JSONField(default=list, blank=True)
    source = models.CharField(max_length=100)
    job_url = models.URLField(unique=True)
    description = models.TextField()
    posted_date = models.DateField(null=True, blank=True)
    is_saved = models.BooleanField(default=False)
    is_applied = models.BooleanField(default=False)
    match_score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    skills = models.JSONField(default=list)
    preferred_location = models.CharField(max_length=100,blank=True)
    experience = models.CharField(max_length=100,blank=True)

    def __str__(self):
        return self.name