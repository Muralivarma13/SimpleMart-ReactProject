import Card from 'react-bootstrap/Card';

function CategoryCard({ fileName, categoryName, onClick }) {
  return (
    <Card
      className="text-white"
      style={{ width: '250px', height: '200px', cursor: 'pointer' }}
      onClick={() => onClick && onClick(categoryName)}
    >
      <Card.Img
        src={fileName}
        alt={categoryName}
        height="200px"
      />

      <Card.ImgOverlay
        style={{
          background: 'rgba(0,0,0,0.5)',
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Card.Title style={{ fontSize: "35px" }}>
          {categoryName}
        </Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
}

export default CategoryCard;
