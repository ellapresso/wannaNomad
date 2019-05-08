<template>
    <v-flex class md8 offset-md2>
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
                <v-text-field
                    v-model="passwordConfirm"
                    type="password"
                    :error-messages="passwordConfirmErrors"
                    :counter="20"
                    label="비밀번호 확인"
                    required
                    @input="$v.passwordConfirm.$touch()"
                    @blur="$v.passwordConfirm.$touch()"
                ></v-text-field>
            </v-flex>
            <v-flex id="login-btn-container">
                <v-btn block color="primary" dark @click="submit">제출하기</v-btn>
                <v-btn block color="primary" dark @click="clear">다시입력</v-btn>
                
            </v-flex>
        </form>
    </v-flex>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
    required,
    minLength,
    maxLength,
    email
} from "vuelidate/lib/validators";

export default {
    name: "join",
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
        passwordConfirm: {
            required,
            minLength: minLength(8),
            maxLength: maxLength(20)
        }
    },

    data: () => ({
        email: "",
        password: "",
        passwordConfirm: "",
    }),
    created() {},
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
        },
        passwordConfirmErrors() {
            const errors = [];
            if (!this.$v.passwordConfirm.$dirty) return errors;
            if (!this.$v.passwordConfirm.minLength || !this.$v.passwordConfirm.maxLength) {
                errors.push("비밀번호 확인은 8~20자리 입니다.");
            }

            if(!this.$v.passwordConfirm.required || (this.passwordConfirm !== this.password)){
                errors.push("비밀번호를 확인해주세요.");
            }
            return errors;
        }
    },

    methods: {
        submit() {
            this.$v.$touch();

            if(!this.emailErrors.length && !this.passwordErrors.length && !this.passwordConfirmErrors.length){
                this.$store.state.firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then(res => {
                        alert('회원가입이 완료되었습니다.');
                        // 일단 대충 result 정보만..
                        this.$store.commit('setLoginStatus', true);
                        this.$store.state.router.push({path : '/'});
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        console.log(error);
                        alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
                    });
            }
        },
        clear() {
            this.$v.$reset();
            this.email = "";
            this.password = "";
            this.passwordConfirm = "";
        },
    }
};
</script>

<style>
#login-btn-container {
    margin-top: 7vh;
}
</style>
