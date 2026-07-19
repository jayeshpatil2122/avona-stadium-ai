from abc import ABC, abstractmethod


class BaseProvider(ABC):

    @abstractmethod
    async def generate(self, prompt: str) -> str:
        """
        Generate an AI response from the given prompt.
        """
        pass
