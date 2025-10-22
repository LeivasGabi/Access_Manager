"use strict";
if (isLoggedIn()) {
    window.location.href = "/director.html";
}
sap.ui.getCore().attachInit(function () {
    const title = new sap.m.Title({ text: "School Portal" }).addStyleClass("sapUiTinyMarginBottom");
    const inpUser = new sap.m.Input({
        placeholder: "User",
        width: "100%",
        liveChange: (e) => e.getSource().setValueState(sap.ui.core.ValueState.None)
    });
    const inpPass = new sap.m.Input({
        placeholder: "Password",
        type: sap.m.InputType.Password,
        width: "100%",
        liveChange: (e) => e.getSource().setValueState(sap.ui.core.ValueState.None)
    });
    function onLogin() {
        const user = inpUser.getValue().trim();
        const pass = inpPass.getValue().trim();
        if (!user) {
            inpUser.setValueState(sap.ui.core.ValueState.Error);
            inpUser.setValueStateText("Inform the user");
            return;
        }
        if (!pass) {
            inpPass.setValueState(sap.ui.core.ValueState.Error);
            inpPass.setValueStateText("Enter the password");
            return;
        }
        if (user === "director1" && pass === "directorone") {
            setSession(user);
            const MessageToast = sap.ui.requireSync("sap/m/MessageToast");
            MessageToast.show("Welcome!");
            setTimeout(() => {
                window.location.href = "/director.html";
            }, 400);
            return;
        }
        sap.m.MessageBox.error("Invalid username or password.");
    }
    const btnLogin = new sap.m.Button({
        text: "Enter",
        type: sap.m.ButtonType.Emphasized,
        press: onLogin
    });
    [inpUser, inpPass].forEach((inp) => inp.attachSubmit(onLogin));
    const form = new sap.m.VBox({
        width: "320px",
        items: [
            title,
            new sap.m.Panel({
                headerText: "Login",
                content: [
                    new sap.m.VBox({
                        items: [
                            inpUser,
                            new sap.m.Toolbar({ visible: false }),
                            inpPass,
                            new sap.m.Toolbar({
                                content: [new sap.m.ToolbarSpacer(), btnLogin]
                            }).addStyleClass("sapUiSmallMarginTop")
                        ]
                    }).addStyleClass("sapUiSmallMargin")
                ]
            }).addStyleClass("sapUiSmallMargin")
        ]
    });
    const page = new sap.m.Page({
        showHeader: false,
        content: [
            new sap.m.VBox({
                width: "100%",
                height: "100%",
                justifyContent: sap.m.FlexJustifyContent.Center,
                alignItems: sap.m.FlexAlignItems.Center,
                items: [form]
            })
        ]
    });
    const app = new sap.m.App({ initialPage: page.getId() });
    app.addPage(page);
    app.placeAt("content");
});
