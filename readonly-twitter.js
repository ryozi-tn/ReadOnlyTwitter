/**
 * Remove Tweet Elements!!
 * @param {HTMLElement} element 
 */
function removeTweetableElements(element) {
    const TWEETABLE_ELEMENT_QUERIES = [
        '#global-new-tweet-button',
        '.timeline-tweet-box',
        '.ProfileTweet-action--reply',
        '.promoted-tweet', // F*CK PROMOTION
        '.inline-reply-tweetbox-container',
    ]
    removeElements(element, TWEETABLE_ELEMENT_QUERIES)
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {[string]} queries
 */
function removeElements(element, queries) {
    getElements(element, queries).forEach(el => {
        //console.log("remove", el)
        el.parentElement.removeChild(el)
    })
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {[string]} queries
 * @return {[HTMLElement]} mating queries
 */
function getElements(element, queries) {
    return queries.reduce((p, q) => p.concat(...(element.querySelectorAll(q) || [])), [])
}

const observer = new MutationObserver(function (mutations) {
    mutations.forEach(m => {
        removeTweetableElements(m.target)
    });
})

function start_observe() {
    const rootElement = document.body
    removeTweetableElements(rootElement)
    observer.observe(rootElement, {
        childList: true,
        subtree: true
    })
}

//document.addEventListener('DOMContentLoaded', function () {
start_observe();
//});
