document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const counter = document.getElementById('counter');
    const plus = document.getElementById('plus');
    const minus = document.getElementById('minus');
    const heart = document.getElementById('heart');
    const pause = document.getElementById('pause');
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('list');
    const likesList = document.querySelector('.likes');

    // Timer functionality
    let intervalId = setInterval(incrementCounter, 1000);

    function incrementCounter() {
        counter.innerText = parseInt(counter.innerText) + 1;
    }

    // Button event listeners
    plus.addEventListener('click', function() {
        counter.innerText = parseInt(counter.innerText) + 1;
    });

    minus.addEventListener('click', function() {
        counter.innerText = parseInt(counter.innerText) - 1;
    });

    heart.addEventListener('click', function() {
        const currentCount = parseInt(counter.innerText);
        const existingLike = document.querySelector(`li[data-num="${currentCount}"]`);

        if (existingLike) {
            const likeCountSpan = existingLike.querySelector('span');
            likeCountSpan.innerText = parseInt(likeCountSpan.innerText) + 1;
        } else {
            const newLike = document.createElement('li');
            newLike.setAttribute('data-num', currentCount);
            newLike.innerHTML = `${currentCount} has been liked <span>1</span> time`;
            likesList.appendChild(newLike);
        }
    });

    pause.addEventListener('click', function() {
        if (pause.innerText === 'pause') {
            clearInterval(intervalId);
            disableButtons(true);
            pause.innerText = 'resume';
        } else {
            intervalId = setInterval(incrementCounter, 1000);
            disableButtons(false);
            pause.innerText = 'pause';
        }
    });

    function disableButtons(disable) {
        plus.disabled = disable;
        minus.disabled = disable;
        heart.disabled = disable;
        document.getElementById('submit').disabled = disable;
    }

    // Comment form submission
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const commentInput = document.getElementById('comment-input');
        const commentText = commentInput.value.trim();

        if (commentText !== '') {
            const commentElement = document.createElement('p');
            commentElement.innerText = commentText;
            commentsList.appendChild(commentElement);
            commentInput.value = '';
        }
    });
});
