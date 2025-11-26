from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from supabase import create_client, Client
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

class SupabaseAuthBackend(BaseBackend):
    """
    Permite iniciar sesión en Django Admin usando credenciales de Supabase (Email/Password).
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        print(f"🔍 Intentando login con Supabase para: {username}")
        if not username or not password:
            return None

        try:
            # Verificar configuración
            if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
                print("❌ Error: SUPABASE_URL o SUPABASE_KEY no están configurados en settings.py")
                return None

            # Conectar a Supabase
            supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
            
            # Intentar login con email y contraseña
            print("📡 Enviando credenciales a Supabase...")
            response = supabase.auth.sign_in_with_password({
                "email": username, 
                "password": password
            })
            
            if response.user:
                print("✅ Login exitoso en Supabase!")
                email = response.user.email
                
                # Buscar o crear el usuario en Django
                user, created = User.objects.get_or_create(username=email)
                
                if created:
                    print(f"👤 Creando nuevo usuario local: {email}")
                    user.email = email
                    user.first_name = "Supabase User"
                    user.is_staff = True
                    user.is_superuser = True
                    user.save()
                else:
                    print(f"👤 Usuario local encontrado: {email}")
                    # Asegurar permisos si ya existía
                    if not user.is_staff:
                        user.is_staff = True
                        user.save()
                
                return user
            else:
                print("⚠️ Supabase no devolvió un usuario.")
                
        except Exception as e:
            print(f"❌ Error de autenticación Supabase: {e}")
            return None
        
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

class SupabaseAuthentication(BaseAuthentication):
    """
    Autenticación para DRF usando el token JWT de Supabase.
    """
    def authenticate(self, request):
        print(f"🔍 [Auth] Verificando autenticación para: {request.path}")
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            print("⚠️ [Auth] No Authorization header found")
            return None
            
        if not auth_header.startswith('Bearer '):
            print("⚠️ [Auth] Header does not start with Bearer")
            return None

        token = auth_header.split(' ')[1]
        print(f"🔑 [Auth] Token recibido (inicio): {token[:10]}...")
        
        try:
            supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
            print("📡 [Auth] Validando token con Supabase...")
            user_response = supabase.auth.get_user(token)
            
            if not user_response.user:
                print("❌ [Auth] Supabase no retornó usuario")
                raise AuthenticationFailed('Token inválido o expirado')

            email = user_response.user.email
            print(f"✅ [Auth] Usuario validado: {email}")
            
            # Buscar o crear usuario en Django
            user, created = User.objects.get_or_create(username=email)
            
            if created:
                print(f"👤 [Auth] Creando usuario local: {email}")
                user.email = email
                user.first_name = "Supabase API User"
                user.save()
            
            return (user, None)

        except Exception as e:
            print(f"❌ [Auth] Error de autenticación: {e}")
            # Importante: Si fallamos aquí, retornamos None para que DRF pruebe otros métodos?
            # O lanzamos error? Si enviaron token y falló, debería ser error.
            raise AuthenticationFailed(f'Error de autenticación: {str(e)}')
