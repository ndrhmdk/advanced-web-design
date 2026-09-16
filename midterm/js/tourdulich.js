class TourDuLich {
    constructor(id, image, tenTour, moTa, ngayKhoiHanh, ngayKetThuc, giaTour) {
        this.id = id;
        this.image = image;
        this.tenTour = tenTour;
        this.moTa = moTa;
        this.ngayKhoiHanh = ngayKhoiHanh;
        this.ngayKetThuc = ngayKetThuc;
        this.giaTour = giaTour;
    }

    static show() {
        return new Promise((resolve, reject) => {
            fetch(API_URL)
                .then(response => {
                    if(!response.ok) throw new Error("Cannot fetch tours.");
                    return response.json();
                }).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        });
    }

    taoTour() {
        const newTour = {
            image: this.image,
            tenTour: this.tenTour,
            moTa: this.moTa,
            ngayKhoiHanh: this.ngayKhoiHanh,
            ngayKetThuc: this.ngayKetThuc,
            giaTour: this.giaTour};
        
        return new Promise((resolve, reject) => {
            fetch(API_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json; charset=UTF-8"},
                body: JSON.stringify(newTour)
            }).then(response => {
                if (!response.ok) throw new Error("Cannot add tour.");
                return response.json();
            }).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    capNhatTour() {
        const updatedTour = {
            image: this.image,
            tenTour: this.tenTour,
            moTa: this.moTa,
            ngayKhoiHanh: this.ngayKhoiHanh,
            ngayKetThuc: this.ngayKetThuc,
            giaTour: this.giaTour};
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/${this.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json; charset=UTF-8"},
                body: JSON.stringify(updatedTour)
            }).then(response => {
                if (!response.ok) throw new Error("Cannot update tour.");
                return response.json();
            }).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    xoaTour() {
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/${this.id}`, {
                method: "DELETE"
            }).then(response => {
                if (!response.ok) throw new Error("Cannot delete tour.");
                return response.json();
            }).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        })
    }
}