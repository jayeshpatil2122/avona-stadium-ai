from app.core.config import settings


def test_app_name_is_configured():
    assert settings.APP_NAME
    assert isinstance(settings.APP_NAME, str)


def test_app_version_is_configured():
    assert settings.APP_VERSION
    assert isinstance(settings.APP_VERSION, str)


def test_llm_provider_is_configured():
    assert settings.LLM_PROVIDER
    assert isinstance(settings.LLM_PROVIDER, str)