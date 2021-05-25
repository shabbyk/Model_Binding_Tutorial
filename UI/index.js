$(function () {
    const baseUrl = "https://localhost:5001/User/";

    // Get Request button
    $("#getRequest").click(function () {
        $.ajax({
            url: `${baseUrl}GetRequest/1`,
            beforeSend: function (jqXHR, settings) {
                emptyAndAppendRequest(`
                <strong>Path:</strong> ${settings.url}<br />
                <strong>Route Data:</strong> 1`);
            },
            success: (response) => {
                emptyAndAppendResponse(response);
            }
        });
    });

    // Get Request With Query String button
    $("#getRequestQuery").click(function () {
        $.ajax({
            url: `${baseUrl}GetRequest/1?name=Shahbaaz&id=2`,
            beforeSend: function (jqXHR, settings) {
                emptyAndAppendRequest(`
                <strong>Path:</strong> ${settings.url}<br />
                <strong>Route Data:</strong> 1<br />
                <strong>Query Parameters:</strong> ${getQueryParams(settings.url)}`);
            },
            success: (response) => {
                emptyAndAppendResponse(response);
            }
        });
    });

    // Set class property
    $("#setClassProperty").click(function () {
        $.ajax({
            url: `${baseUrl}GetRequest?id=999&name=Shahbaaz`,
            beforeSend: function (jqXHR, settings) {
                emptyAndAppendRequest(`
                    <strong>Path:</strong> ${settings.url}<br />
                    <strong>Route Data:</strong> 999`);
            },
            success: (response) => {
                emptyAndAppendResponse(response);
            }
        });
    });

    // Get Request With Complex Types
    $("#GetComplexType").click(function () {
        $.ajax({
            url: `${baseUrl}GetComplexRequest?id=999&name=Shahbaaz&department=security&roles[0]=a&roles[1]=b`,
            beforeSend: function (jqXHR, settings) {
                jqXHR.setRequestHeader('test-header', 'test-value')
                emptyAndAppendRequest(`
                    <strong>Path:</strong> ${settings.url}<br />
                    <strong>Query Data:</strong> <br />
                    id = 999 <br />
                    name = Shahbaaz <br />
                    department = security <br />
                    roles = [a,b] <br />
                    <strong>Header Data:</strong> test-value<br />`);
            },
            success: (response) => {
                emptyAndAppendResponse(response);
            }
        });
    });

    // Post Request With Complex Types
    var userObject = {
        id: 1,
        name: "Shahbaaz",
        department: "Administration",
        roles: ["Admin", "User"]
    }
    $("#postComplexType").click(function () {
        $.ajax({
            url: `${baseUrl}PostRequest`,
            type: "POST",
            data: JSON.stringify(userObject),
            contentType: "application/json",
            beforeSend: function (jqXHR, settings) {
                emptyAndAppendRequest(`
                <strong>Path:</strong> ${settings.url}<br />
                <strong>Complex type object:</strong> 1<br />
                <pre><code>${JSON.stringify(userObject, undefined, 2)}</code></pre>`);
            },
            success: (response) => {
                emptyAndAppendResponse(response);
            }
        });
    });

    // Post Complex Types as Form Data
    var userFormObject = {
        id: 1,
        name: "Shahbaaz",
        department: "Administration",
        roles: ["Admin", "User"]
    }
    $("#postComplexTypeForm").click(function () {
        $.ajax({
            url: `${baseUrl}PostRequestForm`,
            type: "POST",
            data: userFormObject,
            beforeSend: function (jqXHR, settings) {
                emptyAndAppendRequest(`
                    <strong>Path:</strong> ${settings.url}<br />
                    <strong>Complex type object:</strong> 1<br />
                    <pre><code>${JSON.stringify(userFormObject, undefined, 2)}</code></pre>`);
            },
            success: (response) => {
                emptyAndAppendResponse(response);
            }
        });
    });

    // Send File
    var file;
    $("#sendFile").click(function () {
        if(file) {
            var formData = new FormData();
            formData.append("name", file.name);
            formData.append("file", file);

            $.ajax({
                url: `${baseUrl}SendFile`,
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function (jqXHR, settings) {
                    emptyAndAppendRequest(`
                            <strong>File sent</strong>`);
                },
                success: (response) => {
                    emptyAndAppendResponse(response);
                }
            });
        }
    });

    // helpers
    $('#fileContainer input[type=file]').change(function () {
        if (this.files.length > 0) {
            $('#fileContainer .file-name').text(this.files[0].name);
            file = this.files[0];
        }
    })

    function emptyAndAppendRequest(appendData) {
        $("#request").empty();
        $("#request").append(appendData);
    }

    function emptyAndAppendResponse(appendData) {
        $("#response").empty();
        if (typeof (appendData) === "object") {
            $("#response").append(`<pre><code>${JSON.stringify(appendData, undefined, 2)}</code></pre>`);
        } else {
            $("#response").text(appendData);
        }
    }

    function getQueryParams(url) {
        var sp = new URLSearchParams('?' + url.split('?')[1]);
        var str = [];
        for (const [key, value] of sp.entries()) {
            str.push(`${key}=${value}`);
        }

        return str.join(', ');
    }
});