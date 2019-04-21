<template>
    <v-flex class md8 offset-md2 ref="loadingContainer">
        <form id="login-form">
            <v-flex id="login-input-container">
                <v-text-field
                    v-model="email"
                    type="email"
                    :error-messages="emailErrors"
                    label="이메일주소"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    type="password"
                    :error-messages="passwordErrors"
                    :counter="20"
                    label="비밀번호"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                ></v-text-field>
            </v-flex>
            <v-flex id="login-btn-container">
                <v-checkbox
                    v-model="checkbox"
                    label="아이디 저장"
                    @change="$v.checkbox.$touch()"
                    @blur="$v.checkbox.$touch()"
                ></v-checkbox>
                <v-btn block color="primary" dark @click="submit">로그인</v-btn>
                <v-btn block color="primary" dark @click="clear">재입력</v-btn>
                <v-btn block color="primary" dark @click="gotoJoin">회원가입</v-btn>
            </v-flex>
        </form>
    </v-flex>
</template>

<script>
import { validationMixin } from "vuelidate";
import {required, minLength, maxLength, email} from "vuelidate/lib/validators";
import {createNamespacedHelpers} from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('ui/member');

export default {
    name: "login",
    mixins: [validationMixin],

    // $v 객체에 해당한다.
    // 필요한 validation 정보 정의
    validations: {
        email: { required, email },
        password: {
            required,
            minLength: minLength(8),
            maxLength: maxLength(20)
        },
        checkbox: {
            checked(val) {
                return val;
            }
        }
    },

    data: () => ({
        email: "test1234@naver.com",
        password: "12341234",
        checkbox: false,
    }),
    created() {
        if (this.$cookies.get("loginSaveEmail")) {
            this.email = this.$cookies.get("loginSaveEmail");
        }
    },
    mounted() {},
    computed: {
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.email &&
                errors.push("정확한 이메일 형식을 입력하세요.");
            !this.$v.email.required &&
                errors.push("이메일 주소를 입력해주세요.");
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            if (!this.$v.password.minLength || !this.$v.password.maxLength) {
                errors.push("비밀번호는 8~20자리 입니다.");
            }

            !this.$v.password.required &&
                errors.push("비밀번호를 입력해주세요.");
            return errors;
        }
    },
    methods: {
        ...mapActions(['firebaseEmailLogin', 'gotoJoin']),
        submit() {
            this.$v.$touch();

            const loginObj = {
                $v    : this.$v,
                email : this.email,
                password : this.password,
                checkbox : this.checkbox,
                emailErrors : this.emailErrors,
                passwordErrors : this.passwordErrors
            };
            this.firebaseEmailLogin(loginObj);
        },
        clear() {
            this.$v.$reset();
            this.email = "";
            this.password = "";
        },
    },
    created() {
        
    },
};
</script>

<style>
#login-btn-container {
    margin-top: 7vh;
}
</style>
