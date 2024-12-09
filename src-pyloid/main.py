from pyloid import (
    Pyloid,
    PyloidAPI,
    Bridge,
    TrayEvent,
    is_production,
    get_production_path,
)
import os

app = Pyloid(app_name="Pyloid-App", single_instance=True)

if is_production():
    app.set_icon(os.path.join(get_production_path(), "icons/icon.png")) # type: ignore
    app.set_tray_icon(os.path.join(get_production_path(), "icons/icon.png")) # type: ignore
else:
    app.set_icon("src-pyloid/icons/icon.png")
    app.set_tray_icon("src-pyloid/icons/icon.png")


############################## Tray ################################
def on_double_click():
    print("Tray icon was double-clicked.")


app.set_tray_actions(
    {
        TrayEvent.DoubleClick: on_double_click,
    }

)
app.set_tray_menu_items(
    [
        {"label": "Show Window", "callback": app.show_and_focus_main_window},
        {"label": "Exit", "callback": app.quit},
    ]
)
####################################################################

############################## Bridge ##############################
from test_usage.test_functionality import TestClass

# class custom(PyloidAPI):
#     @Bridge(result=str)
#     def create_window(self):
#         window = self.app.create_window(
#             title="Test",
#             js_apis=[custom(), TestClass()],    # Define TestClass() here
#         )

#         window.set_size(800, 600)
#         window.set_position(0, 0)

#         if is_production():
#             window.set_dev_tools(False)
#             window.load_file(os.path.join(get_production_path(), "build/index.html")) # type: ignore
#         else:
#             window.set_dev_tools(True)
#             window.load_url("http://localhost:5173")

#         window.show()
#         window.focus()

#         return window.id


####################################################################


if is_production():
    # production
    window = app.create_window(
        title="Chromify",
        js_apis=[TestClass()],    # Define TestClass() here
    )
    window.load_file(os.path.join(get_production_path(), "build/index.html"))   # type: ignore
else:
    window = app.create_window(
        title="Chromify",
        js_apis=[TestClass()],    # Define TestClass() here
        dev_tools=True,
    )
    window.load_url("http://localhost:5173")

window.show_and_focus()

app.run()  # run
