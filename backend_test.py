#!/usr/bin/env python3
"""
Backend API Testing for Sanjay's Portfolio
Tests all API endpoints including status, contact form, and error handling
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get the base URL from environment
BASE_URL = "https://sanjay-portfolio-2.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

def print_test_header(test_name):
    """Print formatted test header"""
    print(f"\n{'='*60}")
    print(f"Testing: {test_name}")
    print(f"{'='*60}")

def print_test_result(test_name, success, details=""):
    """Print formatted test result"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status} - {test_name}")
    if details:
        print(f"Details: {details}")
    print("-" * 40)

def test_api_status():
    """Test GET /api endpoint for API status"""
    print_test_header("API Status Test")
    
    try:
        response = requests.get(f"{API_BASE}", timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Check if response has expected structure
            if 'message' in data and 'endpoints' in data:
                expected_endpoints = ['GET /api', 'GET /api/contacts', 'POST /api/contacts']
                actual_endpoints = list(data['endpoints'].keys())
                
                if all(endpoint in actual_endpoints for endpoint in expected_endpoints):
                    print_test_result("API Status Test", True, "API is running with correct endpoints")
                    return True
                else:
                    print_test_result("API Status Test", False, f"Missing expected endpoints. Got: {actual_endpoints}")
                    return False
            else:
                print_test_result("API Status Test", False, "Response missing required fields (message, endpoints)")
                return False
        else:
            print_test_result("API Status Test", False, f"Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print_test_result("API Status Test", False, f"Request failed: {str(e)}")
        return False

def test_contact_form_valid():
    """Test POST /api/contacts with valid data"""
    print_test_header("Contact Form - Valid Submission")
    
    valid_contact = {
        "firstName": "John",
        "lastName": "Doe", 
        "email": "john.doe@example.com",
        "subject": "Portfolio Inquiry",
        "message": "I'm interested in your portfolio and would like to discuss potential opportunities."
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/contacts",
            json=valid_contact,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Check response structure
            if data.get('success') and 'data' in data and 'message' in data:
                contact_data = data['data']
                
                # Verify all fields are present
                required_fields = ['id', 'firstName', 'lastName', 'email', 'subject', 'message', 'createdAt']
                if all(field in contact_data for field in required_fields):
                    # Verify data integrity
                    if (contact_data['firstName'] == valid_contact['firstName'] and
                        contact_data['email'] == valid_contact['email']):
                        print_test_result("Valid Contact Submission", True, "Contact submitted successfully with correct data")
                        return True
                    else:
                        print_test_result("Valid Contact Submission", False, "Data integrity issue - submitted data doesn't match")
                        return False
                else:
                    print_test_result("Valid Contact Submission", False, f"Missing fields in response: {required_fields}")
                    return False
            else:
                print_test_result("Valid Contact Submission", False, "Response missing required structure (success, data, message)")
                return False
        else:
            print_test_result("Valid Contact Submission", False, f"Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print_test_result("Valid Contact Submission", False, f"Request failed: {str(e)}")
        return False

def test_contact_form_invalid_email():
    """Test POST /api/contacts with invalid email"""
    print_test_header("Contact Form - Invalid Email")
    
    invalid_contact = {
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "invalid-email",  # Invalid email format
        "subject": "Test",
        "message": "Test message"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/contacts",
            json=invalid_contact,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data and 'email' in data['error'].lower():
                print_test_result("Invalid Email Validation", True, "Correctly rejected invalid email")
                return True
            else:
                print_test_result("Invalid Email Validation", False, "Error message doesn't mention email validation")
                return False
        else:
            print_test_result("Invalid Email Validation", False, f"Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print_test_result("Invalid Email Validation", False, f"Request failed: {str(e)}")
        return False

def test_contact_form_missing_fields():
    """Test POST /api/contacts with missing required fields"""
    print_test_header("Contact Form - Missing Required Fields")
    
    incomplete_contact = {
        "firstName": "Bob",
        # Missing lastName, email, message
        "subject": "Test"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/contacts",
            json=incomplete_contact,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data and 'required' in data['error'].lower():
                print_test_result("Missing Fields Validation", True, "Correctly rejected missing required fields")
                return True
            else:
                print_test_result("Missing Fields Validation", False, "Error message doesn't mention required fields")
                return False
        else:
            print_test_result("Missing Fields Validation", False, f"Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print_test_result("Missing Fields Validation", False, f"Request failed: {str(e)}")
        return False

def test_contact_retrieval():
    """Test GET /api/contacts to retrieve contacts"""
    print_test_header("Contact Retrieval Test")
    
    try:
        response = requests.get(f"{API_BASE}/contacts", timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Check response structure
            if 'success' in data and 'data' in data and 'count' in data:
                if data['success'] and isinstance(data['data'], list):
                    print_test_result("Contact Retrieval", True, f"Successfully retrieved {data['count']} contacts")
                    return True
                else:
                    print_test_result("Contact Retrieval", False, "Invalid response structure or success flag")
                    return False
            else:
                print_test_result("Contact Retrieval", False, "Response missing required fields (success, data, count)")
                return False
        else:
            print_test_result("Contact Retrieval", False, f"Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print_test_result("Contact Retrieval", False, f"Request failed: {str(e)}")
        return False

def test_invalid_routes():
    """Test invalid routes for proper 404 responses"""
    print_test_header("Invalid Routes Test")
    
    invalid_routes = [
        f"{API_BASE}/invalid",
        f"{API_BASE}/users",
        f"{API_BASE}/contacts/123"
    ]
    
    all_passed = True
    
    for route in invalid_routes:
        try:
            response = requests.get(route, timeout=10)
            
            print(f"Testing route: {route}")
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 404:
                print(f"✅ Correctly returned 404 for {route}")
            else:
                print(f"❌ Expected 404, got {response.status_code} for {route}")
                all_passed = False
                
        except Exception as e:
            print(f"❌ Request failed for {route}: {str(e)}")
            all_passed = False
    
    print_test_result("Invalid Routes Test", all_passed, "All invalid routes properly return 404")
    return all_passed

def test_invalid_methods():
    """Test invalid HTTP methods for proper 405 responses"""
    print_test_header("Invalid Methods Test")
    
    test_cases = [
        ("PUT", f"{API_BASE}/contacts"),
        ("DELETE", f"{API_BASE}/contacts"),
        ("PATCH", f"{API_BASE}/contacts")
    ]
    
    all_passed = True
    
    for method, url in test_cases:
        try:
            response = requests.request(method, url, timeout=10)
            
            print(f"Testing {method} {url}")
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 405:
                print(f"✅ Correctly returned 405 for {method}")
            else:
                print(f"❌ Expected 405, got {response.status_code} for {method}")
                all_passed = False
                
        except Exception as e:
            print(f"❌ Request failed for {method}: {str(e)}")
            all_passed = False
    
    print_test_result("Invalid Methods Test", all_passed, "All invalid methods properly return 405")
    return all_passed

def main():
    """Run all backend API tests"""
    print(f"Starting Backend API Tests for Sanjay's Portfolio")
    print(f"Base URL: {BASE_URL}")
    print(f"API Base: {API_BASE}")
    print(f"Test Time: {datetime.now().isoformat()}")
    
    # Track test results
    test_results = {}
    
    # Run all tests
    test_results['api_status'] = test_api_status()
    test_results['contact_valid'] = test_contact_form_valid()
    test_results['contact_invalid_email'] = test_contact_form_invalid_email()
    test_results['contact_missing_fields'] = test_contact_form_missing_fields()
    test_results['contact_retrieval'] = test_contact_retrieval()
    test_results['invalid_routes'] = test_invalid_routes()
    test_results['invalid_methods'] = test_invalid_methods()
    
    # Summary
    print(f"\n{'='*60}")
    print("TEST SUMMARY")
    print(f"{'='*60}")
    
    passed = sum(1 for result in test_results.values() if result)
    total = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend API tests passed!")
        return True
    else:
        print("⚠️  Some tests failed - check details above")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)