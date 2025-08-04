import AdminLayout from '../../components/admin/AdminLayout';
import ProductTable from '../../components/admin/ProductTable';

const ProductsPage = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Products</h1>
        <ProductTable />
      </div>
    </AdminLayout>
  );
};

export default ProductsPage;