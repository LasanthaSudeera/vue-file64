<template>
    <div>
        <label>{{ mainLabel }}</label>
        <div class="main-style">
            <input
                :accept="itemFilter"
                @change="uploadFiles"
                :multiple="isMultiple"
                type="file"
                class="input-style"
            />
            <label class="file-label" :class="{ invalid: errorCheck }">{{
                mainPlaceholder
            }}</label>
        </div>
        <slot v-if="errorCheck" name="errorMessage"></slot>
        <slot v-if="hasUploaded" name="onComplete"></slot>
    </div>
</template>

<script>
export default {
    props : {
        label: String,
        placeholder: String,
        accept: String,
        multiple: Boolean,
        isInvalid: Boolean,
    },
    created() {},
    mounted() {},
    data() {
        return {
            customPlaceHolder: null,
            hasUploaded: false
        };
    },
    methods: {
        uploadFiles: function(event) {
            let text = "";

            if (event.target.files.length == 1) {
                text = " File Choosen";
            } else {
                text = " Files Choosen";
            }

            if (event.target.files.length <= 0) {
                this.customPlaceHolder = null;
                this.output = null;

                this.$emit("output", null);
                this.$emit("filecount", 0);
                this.hasUploaded = false;
                return;
            }

            // Incase if there are files
            let selectedFileCount = event.target.files.length;

            let promises = [];

            let files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const temp = {
                    name: files[i].name,
                    file: ""
                };

                let reader = new FileReader();

                reader.onload = file => {
                    temp.file = reader.result;
                };
                reader.readAsDataURL(files[i]);
                promises.push(temp);
            }

            this.customPlaceHolder = event.target.files.length + text;

            Promise.all(promises).then(fileContents => {
                this.$emit("output", fileContents);
                this.$emit("filecount", event.target.files.length);
                this.hasUploaded = true;
                console.log(promises);
            });
        }
    },
    computed: {
        isMultiple: function() {
            if (this.multiple == null) {
                return false;
            } else {
                return this.multiple;
            }
        },
        mainLabel: function() {
            if (this.label == null) {
                return "Choose To Upload";
            } else {
                return this.label;
            }
        },
        mainPlaceholder: function() {
            if (this.customPlaceHolder != null) {
                return this.customPlaceHolder;
            }

            if (this.placeholder == null) {
                if (this.multiple == false) {
                    return "Choose File";
                } else {
                    return "Choose Files";
                }
            } else {
                return this.placeholder;
            }
        },
        itemFilter: function() {
            if (this.accept == null) {
                return "";
            } else {
                return this.accept;
            }
        },
        errorCheck: function() {
            if (this.isInvalid == null) {
                return false;
            } else {
                return this.isInvalid;
            }
        }
    }
};
</script>

<style scoped>
.main-style {
    position: relative;
    display: inline-block;
    width: 100%;
    height: calc(1.6em + 0.75rem + 2px);
    overflow: hidden !important;
    /* margin-bottom: 3rem !important; */
}

.input-style {
    position: relative;
    z-index: 2;
    width: 100%;
    height: calc(1.6em + 0.75rem + 2px);
    margin: 0;
    opacity: 0;
}

.file-label {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    height: calc(1.6em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-weight: 400;
    line-height: 1.6;
    color: #495057;
    background-color: #fff;
    border: 1px solid #e1e5ed;
    border-radius: 0.25rem;
}

.file-label::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    display: block;
    height: calc(1.6em + 0.75rem);
    padding: 0.375rem 0.75rem;
    line-height: 1.6;
    color: #495057;
    content: "Browse";
    background-color: #e9ecef;
    border-left: inherit;
    border-radius: 0 0.25rem 0.25rem 0;
}

.invalid {
    border: 1px solid #e3342f !important;
}
</style>
