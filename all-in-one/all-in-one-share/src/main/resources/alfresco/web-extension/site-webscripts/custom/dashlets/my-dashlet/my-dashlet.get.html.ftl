<div class="dashlet">
    <div class="title">${msg("dashlet.mydashlet.title")}</div>
    <div class="body">
        <p>${msg("dashlet.mydashlet.message")}</p>
    </div>
    <div class="body">
        <p>Hello, <strong>${user.fullName!user.name}</strong>!</p>
        <p>Today is ${.now?string("yyyy-MM-dd HH:mm")}</p>
    </div>
</div>
