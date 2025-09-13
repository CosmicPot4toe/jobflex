from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth import views as auth_views
from django.contrib import messages
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django import forms
import uuid
import random

class SignUpForm(UserCreationForm):
    full_name = forms.CharField(max_length=150, required=True, label='Nombre Completo')
    email = forms.EmailField(max_length=254, required=True, label='Correo Electrónico')

    class Meta:
        model = User
        fields = ('full_name', 'email')

    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)
        self.fields['password2'].label = "Confirmar Contraseña"
        self.fields['password2'].help_text = ""
        self.fields['password1'].label = "Contraseña"
        self.fields['password1'].help_text = ""
        
        for field_name in self.fields:
            field = self.fields.get(field_name)
            if field:
                field.widget.attrs.update({
                    'class': 'mt-1 block w-full pt-6 pb-3 px-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary peer',
                    'placeholder': ' '
                })

    def save(self, commit=True):
        user = super(SignUpForm, self).save(commit=False)
        user.username = str(uuid.uuid4())
        full_name = self.cleaned_data['full_name']
        parts = full_name.split(' ', 1)
        user.first_name = parts[0]
        if len(parts) > 1:
            user.last_name = parts[1]
        else:
            user.last_name = ''
        if commit:
            user.save()
        return user

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()

            # Generate verification code
            code = str(random.randint(100000, 999999))
            request.session['verification_code'] = code
            request.session['user_pk_for_verification'] = user.pk

            mail_subject = f'Tu código de activación para JobFlex es {code}'
            message = render_to_string('registration/code_email.html', {
                'code': code,
            })
            to_email = form.cleaned_data.get('email')
            email = EmailMessage(
                        mail_subject, message, to=[to_email]
            )
            email.send()
            return redirect('verify_code')
    else:
        form = SignUpForm()
    return render(request, 'registration/register.html', {'form': form})

class VerificationForm(forms.Form):
    code = forms.CharField(max_length=6, required=True, label="Código de Verificación")

def verify_code(request):
    if request.method == 'POST':
        form = VerificationForm(request.POST)
        if form.is_valid():
            entered_code = form.cleaned_data['code']
            stored_code = request.session.get('verification_code')
            user_pk = request.session.get('user_pk_for_verification')

            if entered_code == stored_code:
                try:
                    user = User.objects.get(pk=user_pk)
                    user.is_active = True
                    user.save()
                    login(request, user, backend='JFlex.backends.EmailBackend')
                    # Clear session data
                    del request.session['verification_code']
                    del request.session['user_pk_for_verification']
                    return redirect('index')
                except User.DoesNotExist:
                    form.add_error(None, "Usuario no encontrado.")
            else:
                form.add_error('code', "El código introducido no es correcto.")
    else:
        form = VerificationForm()
    return render(request, 'registration/enter_code.html', {'form': form})

def index(req):
    return render(req, 'index.html')

def register_emp(req):
    return render(req, 'register_emp.html')

def Profile(req):
    return render(req, 'profile.html')

def Validate(req):
    return render(req, 'validation.html')

class CustomPasswordResetConfirmView(auth_views.PasswordResetConfirmView):
    def form_valid(self, form):
        messages.success(self.request, '¡Tu contraseña ha sido actualizada correctamente!')
        return super().form_valid(form)