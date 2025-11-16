// Interactive checkbox functionality
document.addEventListener('DOMContentLoaded', function() {
  const allPagesCheckbox = document.getElementById('allPages');
  const pageCheckboxes = document.querySelectorAll('.page-checkbox');
  
  // Handle "All pages" checkbox
  if (allPagesCheckbox) {
    allPagesCheckbox.addEventListener('change', function() {
      // When "All pages" is checked/unchecked, update all page checkboxes
      pageCheckboxes.forEach(pageCheckbox => {
        pageCheckbox.checked = this.checked;
      });
      console.log('All pages toggled:', this.checked);
    });
  }

  // Handle individual page checkboxes
  pageCheckboxes.forEach(pageCheckbox => {
    pageCheckbox.addEventListener('change', function() {
      // Check if all pages are checked
      const allChecked = Array.from(pageCheckboxes).every(cb => cb.checked);
      
      // Update "All pages" checkbox based on individual page states
      if (allPagesCheckbox) {
        allPagesCheckbox.checked = allChecked;
      }
      
      console.log('Page checkbox toggled:', this.checked);
    });
  });

  // Toast notification function
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    if (toastMessage) {
      toastMessage.textContent = message;
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Handle Done button clicks
  const doneButton = document.querySelector('.done-button');
  
  if (doneButton) {
    doneButton.addEventListener('click', function() {
      // Add visual feedback
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
      
      // Get selected pages
      const selectedPages = [];
      if (allPagesCheckbox && allPagesCheckbox.checked) {
        selectedPages.push('All pages');
      } else {
        pageCheckboxes.forEach(checkbox => {
          if (checkbox.checked) {
            const item = checkbox.closest('.modal-item');
            if (item) {
              const text = item.querySelector('.modal-text').textContent;
              selectedPages.push(text);
            }
          }
        });
      }
      
      // Show toast notification
      const pageCount = selectedPages.length;
      let message = 'Selection saved successfully!';
      
      if (pageCount > 0) {
        if (selectedPages.includes('All pages')) {
          message = 'All pages selected and saved!';
        } else {
          message = `${pageCount} page${pageCount > 1 ? 's' : ''} selected and saved!`;
        }
      } else {
        message = 'No pages selected.';
      }
      
      showToast(message);
      console.log('Done button clicked. Selected pages:', selectedPages);
    });
  }

  // Handle modal item clicks (clicking anywhere on the item toggles checkbox)
  const modalItems = document.querySelectorAll('.modal-item');
  
  modalItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // Don't toggle if clicking directly on the checkbox
      if (e.target.classList.contains('checkbox-input') || 
          e.target.classList.contains('checkbox-custom')) {
        return;
      }
      
      const checkbox = this.querySelector('.checkbox-input');
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
      }
    });
  });
});
