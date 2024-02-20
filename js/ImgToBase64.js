var imageInput = document.getElementById('image-input');
var imageUrlInput = document.getElementById('image-url');
var imageUrlSubmit = document.getElementById('image-url-submit');
var previewImage = document.getElementById('preview-image');
var base64Output = document.getElementById('base64-output');

// 监听本地图片选择
imageInput.addEventListener('change', function (e) {
    let file = e.target.files[0];
    convertToBase64(file);
});

// 监听图片链接提交按钮点击事件
imageUrlSubmit.addEventListener('click', function () {
    let imageUrl = imageUrlInput.value;
    if (imageUrl) {
        convertUrlToBase64(imageUrl);
    }
});

// 转换本地图片为Base64格式并显示
function convertToBase64(file) {
    base64Output.value = null;
    let reader = new FileReader();
    console.log(reader);

    reader.onload = function (event) {
        previewImage.src = event.target.result;
        base64Output.value = event.target.result;
    };

    reader.readAsDataURL(file);
}


// 根据图片链接获取网络图片并转换为Base64格式
function convertUrlToBase64(imageUrl) {
    base64Output.value = null;
    let img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = function () {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        let dataURL = canvas.toDataURL('image/png');
        previewImage.src = dataURL;
        base64Output.value = dataURL;
    };

    img.src = imageUrl;
}

// 点击复制，右键单击删除
base64Output.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    base64Output.value = null;
})
base64Output.addEventListener("click", function () {
    navigator.clipboard.writeText(base64Output.value).then(() => {
        console.log("复制成功");
    })
})