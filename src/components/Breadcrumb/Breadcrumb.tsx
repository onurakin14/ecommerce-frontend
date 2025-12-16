import { Link } from "react-router-dom";

export default function Breadcrumb({ path }: { path: string[] }) {
  return (
    <div className="text-gray-600 text-sm flex items-center gap-1">
      {path.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          
          {index < path.length - 1 ? (
            <Link 
              to={
                index === 0 ? "/" :
                index === 1 ? "/shop" :
                index === 2 ? "/shop/all" : ""
              }
              className="hover:text-blue-600 transition"
            >
              {item}
            </Link>
          ) : (
            <span className="font-medium text-black">{item}</span>
          )}

          {index < path.length - 1 && <span>/</span>}
        </span>
      ))}
    </div>
  );
}
