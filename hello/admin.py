from django.contrib import admin
from hello.models import User, ParentEvent, Event, Team

admin.site.register(User)
admin.site.register(ParentEvent)
admin.site.register(Event)
admin.site.register(Team)