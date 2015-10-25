from django.contrib import admin

from hello.models import User, ParentEvent, Event, Team, Post,Points

admin.site.register(User)
admin.site.register(Post)
admin.site.register(ParentEvent)
admin.site.register(Event)
admin.site.register(Team)
admin.site.register(Points)
