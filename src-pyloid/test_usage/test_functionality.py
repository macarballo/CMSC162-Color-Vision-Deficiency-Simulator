from pyloid import PyloidAPI, Bridge

class TestClass(PyloidAPI):
    @Bridge(result=str)
    def hello_world(self):
        return "Hello Charmagne Duyag!"

    @Bridge(int, int, result=int)
    def add(self, a: int, b: int):
        return a + b