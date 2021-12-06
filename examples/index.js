(function (window) {
    const app = window.document.querySelector("#app");

    const getContent = function() {
        const el = window.document.createElement("div");
        el.innerText = "Hello webpack";
        return el;
    }

    /**
     * will be passed to ivormock
     */
    fetch("/mock/api/test").then(res => {
        console.log(res);
        console.log("nihao2");
    });

    // will receive 404
    fetch("/api/test2").then(res => {
        console.log(res);
    })

    const elem = getContent();
    app.appendChild(elem);
})(window);