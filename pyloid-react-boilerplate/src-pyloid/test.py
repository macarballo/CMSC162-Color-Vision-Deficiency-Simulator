from Pyloid import PyloidAPI, Bridge

class CustomAPI(PyloidAPI):
    @Bridge(result=str)
    def hello_charmagne(self):
        return "Hello Charlemagne!"