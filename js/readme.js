document.addEventListener("DOMContentLoaded", function() {
    fetch("README.md")
        .then(response => response.text())
        .then(data => {
            marked.setOptions({
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                langPrefix: '',
                highlight: function(code, lang) {
                    return code;
                }
            });
            document.querySelector(".container").innerHTML = marked.parse(data);

            // Apply highlight.js
            hljs.initHighlighting.called = false;
            hljs.initHighlighting();
        })
        .catch(error => console.error("Ошибка загрузки README.md:", error));
});