const columns = 
    [
        { title: 'Type', field: 'title_it' },
        { title: 'Euro', field: 'price' },
        { title: 'Date', field: 'created_at',
            render: rowData =>{
              const date = moment(rowData.created_at).format('LL')
              return(
                date
              )
            }   
        },
        { title: 'Deadline', field: ''},
        { title: 'Status', field: 'status',
            render: rowData => {
                return(
                rowData.status == 1 ? <i className="approved">Active</i> :
                <i className="cancel">Inactive</i> 
                )
            }
        },
        { title: 'Payment', field: 'payment_method'},  
    ]