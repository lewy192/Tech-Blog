updatePost = async (e) => {
    e.preventDefault();
    const postTitle = document.querySelector(".new-post-title").value.trim();
    const postContent = document
        .querySelector(".new-post-content")
        .value.trim();

    // creates array of url, removes last item which will be the post id and stores it
    const postId = window.location.pathname.split("/").pop();

    if (postTitle && postContent) {
        const response = await fetch(`api/post/${postId}`, {
            method: "PUT",
            body: {
                postTitle,
                postContent,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
};

deletePost = async (event) => {
    const postId = window.location.pathname.split("/").pop();
    const response = await fetch(`/api/post/${postId}`, { method: "DELETE" });
};

const deleteButton = document.querySelector(".delete-post-button");

deleteButton.addEventListener("click", deletePost);

const updateForm = document.querySelector(".update-post-form");

updateForm.addEventListener("submit", updatePost);
