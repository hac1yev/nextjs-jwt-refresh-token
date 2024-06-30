
const ProductAdd = () => {

    return (
        <form>
            <input type="text" name="title" placeholder="Title" required />
            <input type="number" name="price" placeholder="Price" required />
            <button>Add Product</button>
        </form>
    );
};

export default ProductAdd;