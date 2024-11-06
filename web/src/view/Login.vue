<script setup>
  import log from '../assets/log.svg'
  import register from '../assets/register.svg'
</script>
<template>
    <div class="login-register-page relative w-full h-screen bg-white overflow-hidden">
        <!-- 登录页面中表单的容器 -->
        <div class="login-register-page__form-container absolute top-0 left-0 w-full h-full overflow-auto">
            <!-- 表单 -->
            <div class="login-register-page__form-container__form">
                <!-- 登录表单 -->
                <div class="form login-form flex flex-col justify-center items-center">
                    <h2 class="title mb-6 text-4xl font-bold text-gray-600">登录</h2>
                    <div class="ipt-field">
                        <label for="login-username">
                            <i class='bx bx-user'></i>
                        </label>
                        <input id="login-username" type="text" placeholder="请输入用户名">
                    </div>
                    <div class="ipt-field">
                        <label for="login-password">
                            <i class='bx bx-lock'></i>
                        </label>
                        <input id="login-password" type="password" placeholder="请输入密码">
                    </div>
                    <div class="btn-field">
                        <button>登 录</button>
                    </div>
                    <p class="other-login-text mt-4">其他方式登录</p>
                    <div class="other-login-methods">
                        <a href="#" class="other-login-methods__icon">
                            <i class='bx bxl-facebook'></i>
                        </a>
                        <a href="#" class="other-login-methods__icon">
                            <i class='bx bxl-twitter'></i>
                        </a>
                        <a href="#" class="other-login-methods__icon">
                            <i class='bx bxl-google'></i>
                        </a>
                        <a href="#" class="other-login-methods__icon">
                            <i class='bx bxl-linkedin'></i>
                        </a>
                    </div>
                </div>
                <!-- 注册表单 -->
                <div class="form register-form flex flex-col justify-center items-center">
                    <h2 class="title mb-6 text-4xl font-bold text-gray-600">注册</h2>
                    <div class="ipt-field">
                        <label for="register-username">
                            <i class='bx bx-user'></i>
                        </label>
                        <input id="register-username" type="text" placeholder="请输入用户名">
                    </div>
                    <div class="ipt-field">
                        <label for="register-password">
                            <i class='bx bx-lock'></i>
                        </label>
                        <input id="register-password" type="password" placeholder="请输入密码">
                    </div>
                    <div class="ipt-field">
                        <label for="register-password-again">
                            <i class='bx bx-lock'></i>
                        </label>
                        <input id="register-password-again" type="password" placeholder="请再次输入密码">
                    </div>
                    <div class="btn-field">
                        <button>注 册</button>
                    </div>
                    <p class="other-login-text mt-4">其他方式登录</p>
                    <div class="other-login-methods">
                        <a href="#" class="other-login-methods__icon">
                            <i class='bx bxl-facebook'></i>
                        </a>
                        <a href="#" class="other-login-methods__icon">
                            <i class='bx bxl-twitter'></i>
                        </a>
                        <a href="#" class="other-login-methods__icon">
                            <i class='bx bxl-google'></i>
                        </a>
                        <a href="#" class="other-login-methods__icon">
                            <i class='bx bxl-linkedin'></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 登录页面中面板的容器 -->
        <div class="login-register-page__panel-container">
            <div class="panel left-panel">
                <div class="content text-white">
                    <h3 class="text-2xl font-bold">未拥有账号？</h3>
                    <p class="mt-2 text-sm">前往注册账号，加入我们吧！</p>
                    <div class="btn-field go-register">
                        <button class="btn transparent">去注册</button>
                    </div>
                </div>
                <div class="img-box">
                    <img class="w-full h-full object-contain" :src='log' alt="">
                </div>
            </div>

            <div class="panel right-panel">
                <div class="content text-white">
                    <h3 class="text-2xl font-bold">已拥有账号？</h3>
                    <p class="mt-2 text-sm">前往登录账号，开启旅途吧！</p>
                    <div class="btn-field go-login">
                        <button class="btn transparent">去登录</button>
                    </div>
                </div>
                <div class="img-box">
                    <img class="w-full h-full object-contain" :src='register' alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
   /* 清除默认样式，进行样式统一 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-weight: normal;
    font-size: 16px;
}

a {
    color: #333;
    text-decoration: none;
}
/********************** 尺寸 **********************/
/* 宽度 */
.w-screen {
    width: 100vw;
}

.w-full {
    width: 100%;
}

.min-w-max {
    min-width: -webkit-max-content;
    min-width: -moz-max-content;
    min-width: max-content;
}

/* 高度 */
.h-screen {
    height: 100vh;
}

.h-full {
    height: 100%;
}

.min-h-screen {
    min-height: 100vh;
}

/********************** 布局 **********************/
/* 溢出 */
.overflow-hidden {
    overflow: hidden;
}

.overflow-auto {
    overflow: auto;
}

.overflow-x-hidden {
    overflow-x: hidden;
}

/* object fit */
.object-contain {
    object-fit: contain;
}

/* flex */
.flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
}

.flex-col {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
}

/* 位置 */
.absolute {
    position: absolute;
}

.relative {
    position: relative;
}

.top-0 {
    top: 0px;
}

.left-0 {
    left: 0px;
}

.items-center {
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}

.justify-center {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
}

.justify-end {
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
}

/* 内边距 */
.pl-2 {
    padding-left: .5rem;
}

.pl-4 {
    padding-left: 1rem;
}

.pr-2 {
    padding-right: .5rem;
}

.pr-4 {
    padding-right: 1rem;
}

.px-2 {
    padding-left: .5rem;
    padding-right: .5rem;
}

.px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
}

.p-2 {
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-left: .5rem;
    padding-right: .5rem;
}

/* 外边距 */
.mt-2 {
    margin-top: .5rem;
}

.mt-4 {
    margin-top: 1rem;
}

.mt-6 {
    margin-top: 1.5rem;
}

.mt-8 {
    margin-top: 2rem;
}

.mb-2 {
    margin-bottom: .5rem;
}

.mb-4 {
    margin-bottom: 1rem;
}

.mb-6 {
    margin-bottom: 1.5rem;
}

.my-2 {
    margin-top: .5rem;
    margin-bottom: .5rem;
}

.my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.my-8 {
    margin-top: 2rem;
    margin-bottom: 2rem;
}

/********************** 边框 **********************/
/* 圆角 */
.rounded {
    border-radius: 0.25rem;
}

.rounded-lg {
    border-radius: 0.5rem;
}

.rounded-full {
    border-radius: 9999px;
}

/* style */
.border-none {
    border-style: none;
}

/********************** 文字 **********************/
/* 颜色 */
.text-white {
    color: white;
}

.text-gray-500 {
    color: #6b7280;
}

.text-gray-600 {
    color: #4b5563;
}

.text-gray-700 {
    color: #374151;
}

/* 对齐 */
.text-center {
    text-align: center;
}

/* 大小 */
.text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
}

.text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}

.text-base {
    font-size: 1rem;
    line-height: 1.5rem;
}

.text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
}

.text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
}

.text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
}

.text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
}

.text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
}

.text-5xl {
    font-size: 3rem;
    line-height: 1;
}

/* 粗细 */
.font-bold {
    font-weight: 700;
}

/********************** 互动 **********************/
/* 鼠标样式 */
.cursor-pointer {
    cursor: pointer;
}

.cursor-text {
    cursor: text;
}

/********************** 背景 **********************/
/* 颜色 */
.bg-white {
    background-color: #fff;
}
:root {
    /* 主要颜色 */
    --primary-color: #5995fd;
    --primary-color-dark: #4d84e2;

    /* 背景中圆形颜色 */
    --bg-circle-c: linear-gradient(-45deg, #4481eb, #04befe);

    /* 输入框 */
    --ipt-max-w: 380px;
    --ipt-h: 55px;
    --ipt-m: 10px 0;
    --ipt-p: 0 .5rem;
    --ipt-bgc: #f0f0f0;
    --ipt-font-size: 1rem;
    --ipt-c: #333;
    --ipt-placeholder-c: #aaa;
    --ipt-icon-size: 1.2rem;

    /* 按钮 */
    --btn-w: 150px;
    --btn-h: 49px;
    --btn-m: 10px 0;
    --btn-c: #fff;
    --btn-font-size: .8rem;

    /* 面板中图片 */
    --panel-img-m-w: 200px;

    /* 页面最小高度 */
    --page-min-h: 900px;
}
/* 输入框容器 */
.ipt-field {
    width: 100%;
    height: var(--ipt-h);
    max-width: var(--ipt-max-w);
    padding: var(--ipt-p);
    margin: var(--ipt-m);
    border-radius: 9999px;
    background: var(--ipt-bgc);
    display: grid;
    grid-template-columns: 15% 85%;
}

/* 输入框图标 */
.ipt-field i {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--ipt-icon-size);
    cursor: text;
}

/* 输入框 */
.ipt-field input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: none;
    font-size: var(--ipt-font-size);
    color: var(--ipt-c);
    overflow: hidden;
}

/* 输入框提示文字 */
.ipt input::placeholder {
    color: var(--ipt-placeholder-c);
}

/* 清楚密码框默认的小眼睛 */
.ipt[type="password"]::-ms-reveal {
    display: none
}
/* 按钮 */
.btn-field button{
    width: var(--btn-w);
    height: var(--btn-h);
    margin: var(--btn-m);
    border: none;
    border-radius: 9999px;
    background-color: var(--primary-color);
    outline: none;
    color: var(--btn-c);
    font-size: var(--btn-font-size);
    cursor: pointer;
}

/* 按钮鼠标悬停 */
.btn-field button:hover {
    background-color: var(--primary-color-dark);
}

/* 具有透明类名的按钮 */
.btn-field button.transparent{
    border: 2px solid #fff;
    background-color: transparent;
}
/* 其他登录方式 */
.other-login-methods {
    margin: 10px 0;
    display: flex;
}

/* 其他登录方式图标 */
.other-login-methods__icon {
    width: 46px;
    height: 46px;
    margin: 0 5px;
    border: 1px solid #333;
    border-radius: 9999px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .2s;
}

/* 其他登录方式图标鼠标悬停 */
.other-login-methods__icon:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
}
/* 登录注册页面 */
.login-register-page {
    min-height: var(--page-min-h);
}

/* 登录注册页面中的扇形(圆，只显示部分) */
/* 该元素层级比表单高，为了移动时可以遮挡表单 */
/* 
    定位如何处理球的位置：
    此时我们要在页面中展示球的右下和左下部分，且后面我们希望通过水平移动实现页面动画，
    同时还希望定位能正数百分比，因此选页面的右上作为基准，通过垂直平移将球的水平
    直径定在页面上边(因为球可能大于页面，所以球初始要在页面上边下面，才可以通过垂直水平
    移动球自身的 50% 将球的水平直径定在页面上边)，这样我们就可以通过平移利用球的右下和
    左下部分
    （其他同理）
*/
.login-register-page::before {
    /* 圆的直径 */
    /* --circle-diameter: calc(100vh * 1.05 * 2); */
    --circle-diameter: 2500px;
    content: '';
    position: absolute;
    right: 55%;
    top: 5%;
    transform: translateY(-50%);
    z-index: 6;
    width: var(--circle-diameter);
    height: var(--circle-diameter);
    border-radius: 50%;
    background: var(--bg-circle-c);
    transition: 1.8s ease-in-out;
}

/* 登录注册页面中的表单 */
/* 将表单设置为一个只有一格的 grid 容器，然后将登录和注册表单放置在同一格中，实现不脱标又可重叠 */
.login-register-page__form-container__form {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    z-index: 5;
    width: 50%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    transition: 1s ease-in-out;
    transition-delay: .6s;
}

/* 表单 */
.form {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    transition: opacity .75s ease-in-out;
    transition-delay: .6s;
}

/* 登录表单 */
/* pointer-events 用于控制容器可以成为那些鼠标事件的目标，由于两个表单重叠，所以需要进行该控制 */
.login-form {
    opacity: 1;
    pointer-events: all;
}

/* 注册表单 */
.register-form {
    opacity: 0;
    pointer-events: none;
}

/* 页面中的面板容器 */
.login-register-page__panel-container {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
}

/* 面板 */
/* 控制面板的层级，而不是整个面板容器，防止遮挡表单 */
.panel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    z-index: 7;
    transition: transform .9s ease-in-out;
    transition-delay: .3s;
}

/* 左面板 */
.left-panel {
    padding: 3rem 17% 2rem 12%;
    transform: translateX(0);
}

/* 右面板 */
/* 默认整个移出页面，否则遮挡表单 */
.right-panel {
    padding: 3rem 12% 2rem 17%;
    transform: translateX(100%);
}

/*************************** 注册模式 ***************************/
/* 登录注册页面中的扇形 */
.login-register-page.register-mode::before {
    right: 50%;
    transform: translate(100%, -50%);
}

/* 登录注册页面中的表单 */
.login-register-page.register-mode .login-register-page__form-container__form {
    right: 50%;
}

/* 登录表单 */
.login-register-page.register-mode .login-form {
    opacity: 0;
}

/* 注册表单 */
.login-register-page.register-mode .register-form {
    opacity: 1;
}

/* 左面板  */
.login-register-page.register-mode .left-panel {
    transform: translateX(-100%);
}

/* 右面板  */
.login-register-page.register-mode .right-panel {
    transform: translateX(0);
}

/* 当屏幕宽小于等于 815px 时的样式 */
@media screen and (max-width: 875px) {

    /* 登录注册页面中的扇形 */
    .login-register-page::before {
        --circle-diameter: 1500px;
        top: initial;
        right: initial;
        left: 30%;
        bottom: 80%;
        transform: translateX(-50%);
    }

    /* 登录注册页面中的表单 */
    .login-register-page__form-container__form {
        top: 50%;
        right: 0;
        transform: translateY(-25%);
        width: 100%;
    }

    /* 页面中的面板容器 */
    .login-register-page__panel-container {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr 1fr;
    }

    /* 面板 */
    .panel {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    /* 左面板 */
    .left-panel {
        padding: 1rem 17% 1rem 12%;
        grid-row: 1 / 2;
    }

    /* 右面板 */
    .right-panel {
        padding: 1rem 12% 1rem 17%;
        grid-row: 3 / 4;
    }

    /* 面板中的图片 */
    .panel .img-box {
        width: var(--panel-img-m-w);
    }

    /*************************** 注册模式 ***************************/
    /* 登录注册页面中的扇形 */
    .login-register-page.register-mode::before {
        bottom: 22%;
        transform: translate(-50%, 100%);
    }

    /* 登录注册页面中的表单 */
    .login-register-page.register-mode .login-register-page__form-container__form {
        top: 0;
        right: 0;
        transform: translateY(25%);
        width: 100%;
    }
}

/* 当屏幕宽小于等于 600px 时的样式 */
@media screen and (max-width: 600px) {

    /* 登录注册页面中的扇形 */
    .login-register-page::before {
        left: 50%;
        bottom: 80%;
        transform: translateX(-50%);
    }

    /* 登录注册页面中的表单 */
    .login-register-page__form-container__form {
        transform: translateY(-35%);
        box-sizing: border-box;
        padding: 0 1rem;
    }

    /* 面板 */
    .panel {
        transition-delay: .5s;
    }

    /* 面板 */
    .panel,
    .panel .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    /* 左面板 */
    .left-panel {
        transform: translateY(0);
    }

    /* 右面板 */
    .right-panel {
        transform: translateY(100%);
    }

    /*************************** 注册模式 ***************************/
    /* 登录注册页面中的扇形 */
    .login-register-page.register-mode::before {
        bottom: 36%;
        transform: translate(-50%, 100%);
    }

    /* 登录注册页面中的表单 */
    .login-register-page.register-mode .login-register-page__form-container__form {
        transform: translateY(10%);
    }

    /* 左面板  */
    .login-register-page.register-mode .left-panel {
        transform: translateY(-100%);
    }

    /* 右面板  */
    .login-register-page.register-mode .right-panel {
        transform: translateY(0);
    }
}
</style>