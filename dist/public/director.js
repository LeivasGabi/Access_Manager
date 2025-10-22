"use strict";
sap.ui.getCore().attachInit(function () {
    const token = localStorage.getItem("am_token");
    const role = localStorage.getItem("am_role");
    if (!token || role !== "director") {
        window.location.href = "/login.html";
        return;
    }
    const btnLogout = new sap.m.Button({
        text: "Sair",
        type: sap.m.ButtonType.Transparent,
        press: () => {
            localStorage.removeItem("am_token");
            localStorage.removeItem("am_user");
            localStorage.removeItem("am_role");
            window.location.href = "/login.html";
        }
    });
    const header = new sap.m.Bar({
        contentLeft: [new sap.m.Title({ text: "Director's Portal" })],
        contentRight: [btnLogout]
    });
    const pageContent = [];
    const mock = [
        { name: "Teacher 1", student: [
                { name: "Student 1", frequency: 0, score: 0 },
                { name: "Student 2", frequency: 0, score: 0 },
                { name: "Student 3", frequency: 0, score: 0 }
            ] },
        { name: "Teacher 2", student: [
                { name: "Student 1", frequency: 0, score: 0 },
                { name: "Student 2", frequency: 0, score: 0 },
                { name: "Student 3", frequency: 0, score: 0 }
            ] },
        { name: "Teacher 3", student: [
                { name: "Student 1", frequency: 0, score: 0 },
                { name: "Student 2", frequency: 0, score: 0 },
                { name: "Student 3", frequency: 0, score: 0 }
            ] }
    ];
    function buildTeacherPanel(p) {
        const table = new sap.m.Table({
            inset: false,
            columns: [
                new sap.m.Column({ header: new sap.m.Label({ text: "Student" }) }),
                new sap.m.Column({ header: new sap.m.Label({ text: "Frequency (%)" }), hAlign: "Center" }),
                new sap.m.Column({ header: new sap.m.Label({ text: "Score" }), hAlign: "Center" })
            ]
        });
        p.student.forEach((student) => {
            const item = new sap.m.ColumnListItem({
                cells: [
                    new sap.m.Text({ text: student.name }),
                    new sap.m.StepInput({
                        min: 0, max: 100, step: 1, width: "8rem",
                        value: student.frequency
                    }),
                    new sap.m.StepInput({
                        min: 0, max: 10, step: 0.5, width: "8rem",
                        value: student.score
                    })
                ]
            });
            table.addItem(item);
        });
        return new sap.m.Panel({
            headerText: p.name,
            expandable: true,
            expanded: true,
            content: [table]
        });
    }
    mock.forEach((prof) => pageContent.push(buildTeacherPanel(prof)));
    const page = new sap.m.Page({
        customHeader: header,
        content: [
            new sap.m.VBox({
                width: "100%",
                items: [
                    new sap.m.ObjectHeader({
                        title: "Director's Portal",
                    }),
                    ...pageContent
                ]
            })
        ]
    });
    const app = new sap.m.App({ initialPage: page.getId() });
    app.addPage(page);
    app.placeAt("content");
});
