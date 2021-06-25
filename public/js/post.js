updatePost = async (e) => {
    e.preventDefault();

    const postTitle = document
        .querySelector(".new-post-title-input")
        .value.trim();

    const postContent = document
        .querySelector(".new-post-content-input")
        .value.trim();

    // creates array of url, removes last item which will be the post id and stores it
    const postId = window.location.pathname.split("/").pop();

    if (postTitle && postContent) {
        const response = await fetch(`/api/post/${postId}`, {
            method: "PUT",
            body: JSON.stringify({
                postTitle,
                postContent,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        if (response.ok) {
            window.location.replace(`/post/${postId}`);
        }
    }
};

deletePost = async (event) => {
    const postId = window.location.pathname.split("/").pop();
    const response = await fetch(`/api/post/${postId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    }
    //
};

let deletePostButton = document.querySelector(".delete-post-button");

deletePostButton.addEventListener("click", deletePost);

const updateForm = document.querySelector(".update-post-form");

updateForm.addEventListener("submit", updatePost);
