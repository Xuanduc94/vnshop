import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import productApi from '../../apis/productApi';
import Layout from '../../components/Layout';
import Toolbar from '../../components/Toolbar/Toolbar';
import FilterComponent from './FilterComponent';
import ProductModal from './ProductModal';

function Product(props) {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);
    const [data, setData] = useState([]);
    const [productId, setProductId] = useState(0);
    const filteredItems = data.filter(
        item => item.TenSanPham && item.TenSanPham.toLowerCase().includes(filterText.toLowerCase()) || item.MaSanPham && item.MaSanPham.toLowerCase().includes(filterText.toLowerCase()),
    );
    const menu = [{
        name: "Thêm mới",
        function: function () {
            setProductId(0)
            $('#modal-product').modal('show')
        }
    }]

    function loadData() {
        productApi.list().then(res => {
            setData(res)
        })
    }

    useEffect(() => {
        loadData();
    }, [])

    function editProduct(productId) {
        setProductId(productId)
        $('#modal-product').modal('show')
    }

    function destroy(id) {
        swal({ title: "Bạn có muốn xóa sản phẩm này không", text: "Xác nhận xóa sản phẩm", icon: "warning", buttons: true }).then(isConfirm => {
            if (isConfirm) {
                productApi.destroy(id).then(res => {
                    toast.success(res.msg)
                    loadData();
                })
            }
        })

    }
    const columns = [
        {
            name: 'Mã sản phẩm',
            selector: row => row.MaSanPham,
        },
        {
            name: 'Tên sản phẩm',
            selector: row => row.TenSanPham,
        },
        {
            name: 'Dơn vị tính',
            selector: row => {
                if (row.sanphamdonvis.length > 0) {

                    return row.sanphamdonvis.find(s => s.Primary == true) != null ? row.sanphamdonvis.find(s => s.Primary == true).donvitinh.TenDonVi : ""
                } else {
                    return 0
                }
            }
        },
        {
            name: 'Giá lẻ',
            selector: row => {
                if (row.sanphamdonvis.length > 0) {
                    return row.sanphamdonvis.find(s => s.Primary == true) != null ? row.sanphamdonvis.find(s => s.Primary == true).GiaLe : 0
                } else {
                    return 0
                }

            }
        },
        {
            name: 'Giá sỉ',
            selector: row => {
                if (row.sanphamdonvis.length > 0) {
                    return row.sanphamdonvis.find(s => s.Primary == true) != null ? row.sanphamdonvis.find(s => s.Primary == true).GiaSi : 0
                } else {
                    return 0
                }
            },
        },
        {
            name: "Thao tác",
            cell: function (row) {
                return <><button onClick={() => editProduct(row.id)} className='btn btn btn-sm btn-info mr-1'><i className='fa fa-edit'></i></button><button onClick={() => destroy(row.id)} className='btn btn btn-sm btn-danger'><i className='fa fa-trash'></i></button></>
            }
        }
    ]
    return (
        <Layout>
            <div className='col-12'>
                <Toolbar menu={menu} />
            </div>
            <div className='col-12'>
                <DataTable columns={columns} data={filteredItems} pagination persistTableHead subHeader subHeaderComponent={subHeaderComponentMemo} />
            </div>
            <ProductModal refresh={loadData} listProduct={data} productId={productId} />
        </Layout>
    );
}

export default Product;