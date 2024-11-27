/*document.addEventListener('DOMContentLoaded', function () {
    console.log("Interaction script loaded");
    const pileTitles = ["Home", "Explore", "Notifications", "Messages", "Bookmarks", "Lists", "Profile", "More"];

    const titleRegex = /^(["#].*?)\s-\sSearch\s\/\sX$/;

    const isStockTitle = title => pileTitles.includes(title);

    let extractedQuery = null;

    const titleTag = document.querySelector("title");
    console.log("Title tag", titleTag);
    if (titleTag) {
        const observer = new MutationObserver(() => {

            const updatedTitle = titleTag.textContent.trim();
            console.log("Title updated:", updatedTitle);
            const match = updatedTitle.match(titleRegex);

            if (match) {
                extractedQuery = match[1];
                console.log("Extracted query int", extractedQuery);

                if (!isStockTitle(updatedTitle)) {
                    console.log("Title is not stock.");
                } else {
                    console.log("Title is stock.");
                    extractedQuery = null;
                }
            }
        })
        observer.observe(titleTag, { childList: true });
    }
});*/