export class Basket {
    constructor(rootId) {
        this.rootId = rootId || document;
        this.init();
        document.addEventListener('content.loaded', this.init.bind(this));
    }

    init() {
        this.addToBasketBtns = this.rootId.querySelectorAll('.js-add-to-basket');
        if (this.addToBasketBtns.length) {
            [].forEach.call(this.addToBasketBtns, btn => {
                btn.removeEventListener('click', this.btnClickHandler.bind(this));
                btn.addEventListener('click', this.btnClickHandler.bind(this));
            });
        }
    }

    btnClickHandler(evt) {
        const btn = evt.target;
        let quantity = btn.dataset.quantity;
        if (quantity.length <= 0)
            quantity = 1;
        this.addToBasket(btn.dataset.id, parseFloat(quantity));
    }

    addToBasket(productId, quantity = 1) {
        quantity = quantity ?? 1;
        BX.showWait();
        BX.ajax.runAction('izifir:core.api.basket.add', {
            data: {
                productId: productId,
                quantity: quantity
            }
        }).then(res => {
            const headerBasketCount = document.querySelector('.js-h-basket-count');
            if (headerBasketCount) {
                const count = parseInt(res.data.count);
                if (count > 0) {
                    headerBasketCount.innerHTML = count;
                    headerBasketCount.style.opacity = '1';
                } else {
                    headerBasketCount.style.opacity = '0';
                }
            }
            setTimeout(function () {
                BX.closeWait();
            }, 300);
        });
    }
}
