async function testEndpoints() {
    const baseUrl = 'http://localhost:5000/api';
    console.log('--- STARTING API HEALTH CHECK (Native Fetch) ---');

    try {
        // 1. Test Get All Products (Pagination check)
        console.log('\n1. Testing GET /products (Pagination)...');
        const res1 = await fetch(`${baseUrl}/products`);
        const data1 = await res1.json();

        if (res1.status === 200 && data1.products && Array.isArray(data1.products)) {
            console.log('✅ PASS: Products endpoint returned paginated structure.');
            console.log(`   Count: ${data1.products.length} items on page 1`);
        } else {
            console.log('❌ FAIL: Products endpoint format incorrect:', data1);
        }

        // 2. Test Get Top Products
        console.log('\n2. Testing GET /products/top ...');
        const res2 = await fetch(`${baseUrl}/products/top`);
        const data2 = await res2.json();

        if (res2.status === 200 && Array.isArray(data2)) {
            console.log('✅ PASS: Top Products endpoint returned array.');
            console.log(`   Count: ${data2.length} top items`);
        } else {
            console.log('❌ FAIL: Top Products failed:', data2);
        }

    } catch (error) {
        console.error('❌ CRITICAL FAILURE:', error.message);
    }
    console.log('\n--- TEST COMPLETE ---');
}

testEndpoints();
