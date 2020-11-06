import { storage } from "../../model/db";
const subBucketRef = storage.child("mainBucket/subBucket");
export default {
    name: "App",
    data() {
        return {
            file: "",
            link: ""
        };
    },
    methods: {
        uploadHandler() {
            if (this.file) {
                const fileName = this.file.name;
                const targetRef = subBucketRef.child(fileName);
                targetRef.put(this.file).then(response => {
                    console.log(response);
                    response.ref.getDownloadURL().then(photoURL => {
                        this.link = photoURL;
                    });
                });
            } else {
                console.log("no file upload!!");
            }
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.file = file;
            this.link = "";

        }
    }
};