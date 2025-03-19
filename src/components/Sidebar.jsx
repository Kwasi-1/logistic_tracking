const Sidebar = ({ selectedBusiness }) => {
  return (
    <div className="sidebar">
      {selectedBusiness && (
        <div className="business-info">
          <h2>{selectedBusiness.name}</h2>
          <p>
            <strong>Location:</strong> {selectedBusiness.location.lat}, {selectedBusiness.location.lng}
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
