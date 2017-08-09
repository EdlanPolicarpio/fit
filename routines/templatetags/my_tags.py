from django.template.defaulttags import register

#https://stackoverflow.com/questions/8000022/django-template-how-to-look-up-a-dictionary-value-with-a-variable
@register.filter
def get_item(dictionary, key):
	return dictionary.get(key)
